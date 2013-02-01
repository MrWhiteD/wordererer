/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.wallenius.domain.proxyclient;

import com.google.api.client.util.Key;
import java.util.List;

/**
 *
 * @author fredrik
 */
public class Provider {
    
    @Key("provider")
    private String name;
    
    @Key()
    private List<String> result;

    public String getName() {
        return name;
    }

    public List<String> getResult() {
        return result;
    }

    public void setResult(List<String> result) {
        this.result = result;
    }
    
    

    @Override
    public String toString() {
        return "Provider{" + "name=" + name + ", result=" + result + '}';
    }

}
