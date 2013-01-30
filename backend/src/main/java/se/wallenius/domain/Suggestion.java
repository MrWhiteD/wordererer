
package se.wallenius.domain;

/**
 *
 * @author fredrik
 */
public class Suggestion {
    
    private String phrase;
    private Double score;

    public Suggestion(String phrase, Double score) {
        this.phrase = phrase;
        this.score = score;
    }

    public String getPhrase() {
        return phrase;
    }

    public void setPhrase(String phrase) {
        this.phrase = phrase;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }
    
}
