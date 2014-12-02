
package com.myproddb.data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;


/**
 *  myproddb.Locations
 *  11/30/2014 15:02:39
 * 
 */
public class Locations {

    private String code;
    private String name;
    private String subDivision;
    private String status;
    private Date date;
    private String iata;
    private String coordinates;
    private Set<com.myproddb.data.UserTariffs> usertariffss = new HashSet<com.myproddb.data.UserTariffs>();

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubDivision() {
        return subDivision;
    }

    public void setSubDivision(String subDivision) {
        this.subDivision = subDivision;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getIata() {
        return iata;
    }

    public void setIata(String iata) {
        this.iata = iata;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public Set<com.myproddb.data.UserTariffs> getUsertariffss() {
        return usertariffss;
    }

    public void setUsertariffss(Set<com.myproddb.data.UserTariffs> usertariffss) {
        this.usertariffss = usertariffss;
    }

}
