
package com.myproddb.data;

import java.util.HashSet;
import java.util.Set;


/**
 *  myproddb.PortCodes
 *  11/30/2014 15:02:38
 * 
 */
public class PortCodes {

    private String portCode;
    private String portName;
    private String portCountry;
    private String loCode;
    private Set<com.myproddb.data.UserTariffs> usertariffss = new HashSet<com.myproddb.data.UserTariffs>();

    public String getPortCode() {
        return portCode;
    }

    public void setPortCode(String portCode) {
        this.portCode = portCode;
    }

    public String getPortName() {
        return portName;
    }

    public void setPortName(String portName) {
        this.portName = portName;
    }

    public String getPortCountry() {
        return portCountry;
    }

    public void setPortCountry(String portCountry) {
        this.portCountry = portCountry;
    }

    public String getLoCode() {
        return loCode;
    }

    public void setLoCode(String loCode) {
        this.loCode = loCode;
    }

    public Set<com.myproddb.data.UserTariffs> getUsertariffss() {
        return usertariffss;
    }

    public void setUsertariffss(Set<com.myproddb.data.UserTariffs> usertariffss) {
        this.usertariffss = usertariffss;
    }

}
