/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.wallenius.domain;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import se.wallenius.domain.proxyclient.Provider;
import se.wallenius.domain.proxyclient.ProxyClient;

/**
 *
 * @author fredrik
 */
@Service
public class DefaultRelatedSearchService implements RelatedSearchService {

    @Override
    public List<Suggestion> findRelatedPhrases(String term) {
        System.out.println("Searching for " + term);
        final List<Suggestion> suggestions = new ArrayList<Suggestion>();
        
        final List<Provider> result = new ProxyClient().requestForTerm(term);
        
        for (Provider resp : result) {
            for (String phrase : resp.getResult()) {
                suggestions.add(new Suggestion(phrase, 1.0));
            }
        }
        
        return suggestions;
    }
    
}
