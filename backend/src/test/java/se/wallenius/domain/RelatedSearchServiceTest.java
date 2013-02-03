package se.wallenius.domain;

import java.util.ArrayList;
import java.util.Arrays;
import static org.junit.Assert.*;
import static org.mockito.Matchers.*;
import static org.mockito.Mockito.*;

import java.util.Collection;
import java.util.List;
import javax.annotation.Resource;
import org.junit.Before;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import se.wallenius.domain.proxyclient.Provider;
import se.wallenius.domain.proxyclient.ProxyClient;

@RunWith(MockitoJUnitRunner.class)
public class RelatedSearchServiceTest {

    @InjectMocks
    private DefaultRelatedSearchService searchService = new DefaultRelatedSearchService();
    @Mock
    private ProxyClient proxyClient = new ProxyClient();
    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUp() {
        reset(proxyClient);
    }

    @Test
    public void shouldHandleNullResultFromHttpClient() {

        String term = "foo";
        when(proxyClient.requestForTerm(term)).thenReturn(null);

        List<Suggestion> result = searchService.findRelatedPhrases(term);

        assertNotNull(result);
        assertEquals(0, result.size());
    }

    @Test
    public void shouldMakeAllLowerCase() {

        setUpProxyToReturn(new String[]{"UPPERCASE"});
        
        List<Suggestion> result = this.searchService.findRelatedPhrases("foo");
        
        assertEquals(1, result.size());
        Suggestion suggestion = result.get(0);
        assertEquals("uppercase", suggestion.getPhrase());
    }
    
    @Test
    public void shouldRemoveDuplicates() {
        
        String term = "duplicate";
        
        setUpProxyToReturn(new String[]{term, term});
        
        List<Suggestion> result = this.searchService.findRelatedPhrases(term);
        
        assertEquals(1, result.size());
        
        Suggestion suggestion = result.get(0);
        assertEquals(term, suggestion.getPhrase());
    }
    
    
    /*
     *
     * More tests would be added here to test rest of business logic...
     * 
     * 
     */
    

    private void setUpProxyToReturn(String[] terms) {
      
        List<String> stringList = new ArrayList<String>();
        stringList.addAll(Arrays.asList(terms));
        
        Provider provider = new Provider();
        provider.setResult(stringList);
        
        List<Provider> result = new ArrayList<Provider>();
        result.add(provider);
        
        when(proxyClient.requestForTerm(any(String.class))).thenReturn(result);
    }
}