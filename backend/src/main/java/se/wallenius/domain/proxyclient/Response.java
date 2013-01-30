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
public class Response {
    
    @Key("apis")
    private List<Provider> providers;

    public List<Provider> getProviders() {
        return providers;
    }
    
}
