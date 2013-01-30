
package se.wallenius.domain;

import java.util.List;

/**
 *
 * @author fredrik
 */
public interface RelatedSearchService {
    
    /**
     * Performs searches against configured apis for related phrases.
     * 
     * @param term Word or phrase.
     * @return List of Suggestions.
     */
    List<Suggestion> findRelatedPhrases(final String term);
    
}
