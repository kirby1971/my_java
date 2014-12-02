
package com.myproddb.data;

import java.util.HashSet;
import java.util.Set;


/**
 *  myproddb.ContainerTypes
 *  11/30/2014 15:02:38
 * 
 */
public class ContainerTypes {

    private String containerType;
    private String description;
    private Float insideLength;
    private Float insideWidth;
    private Float insideHeight;
    private Float doorWidth;
    private Float doorHeight;
    private Float capacity;
    private Float tareWeight;
    private Float maxCargoWeight;
    private Set<com.myproddb.data.UserTariffs> usertariffss = new HashSet<com.myproddb.data.UserTariffs>();

    public String getContainerType() {
        return containerType;
    }

    public void setContainerType(String containerType) {
        this.containerType = containerType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getInsideLength() {
        return insideLength;
    }

    public void setInsideLength(Float insideLength) {
        this.insideLength = insideLength;
    }

    public Float getInsideWidth() {
        return insideWidth;
    }

    public void setInsideWidth(Float insideWidth) {
        this.insideWidth = insideWidth;
    }

    public Float getInsideHeight() {
        return insideHeight;
    }

    public void setInsideHeight(Float insideHeight) {
        this.insideHeight = insideHeight;
    }

    public Float getDoorWidth() {
        return doorWidth;
    }

    public void setDoorWidth(Float doorWidth) {
        this.doorWidth = doorWidth;
    }

    public Float getDoorHeight() {
        return doorHeight;
    }

    public void setDoorHeight(Float doorHeight) {
        this.doorHeight = doorHeight;
    }

    public Float getCapacity() {
        return capacity;
    }

    public void setCapacity(Float capacity) {
        this.capacity = capacity;
    }

    public Float getTareWeight() {
        return tareWeight;
    }

    public void setTareWeight(Float tareWeight) {
        this.tareWeight = tareWeight;
    }

    public Float getMaxCargoWeight() {
        return maxCargoWeight;
    }

    public void setMaxCargoWeight(Float maxCargoWeight) {
        this.maxCargoWeight = maxCargoWeight;
    }

    public Set<com.myproddb.data.UserTariffs> getUsertariffss() {
        return usertariffss;
    }

    public void setUsertariffss(Set<com.myproddb.data.UserTariffs> usertariffss) {
        this.usertariffss = usertariffss;
    }

}
