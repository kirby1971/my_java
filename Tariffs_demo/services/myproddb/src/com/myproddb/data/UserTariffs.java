
package com.myproddb.data;



/**
 *  myproddb.UserTariffs
 *  11/30/2014 15:02:38
 * 
 */
public class UserTariffs {

    private UserTariffsId id;
    private String portOfLoading;
    private Float freightRateWm;
    private Float volume;
    private Integer expectedPallets;
    private Float exchangeRate;
    private String deliveryLocationNl;
    private Float oceanfreightAmount;
    private Float cfsChargesDest;
    private Float delOrderFee;
    private Float customsValue;
    private Float transportDestCosts;
    private Float dieselSurcharge;
    private Float handlingFeeLcl;
    private String fclLcl;
    private String containerType;
    private Integer distance;
    private Integer range;
    private String deltaEuromax;
    private Float thcChargesCarrier;
    private Float isps;
    private Float deliveryOrderFee;
    private Float containertransportToDestination;
    private Float deltaEuromaxSurcharge;
    private Float allInHandlingFee;
    private String status;
    private PortCodes rel_port_of_loading;
    private ContainerTypes rel_container_type;
    private Locations rel_delivery_location_nl;

    public UserTariffsId getId() {
        return id;
    }

    public void setId(UserTariffsId id) {
        this.id = id;
    }

    public String getPortOfLoading() {
        return portOfLoading;
    }

    public void setPortOfLoading(String portOfLoading) {
        this.portOfLoading = portOfLoading;
    }

    public Float getFreightRateWm() {
        return freightRateWm;
    }

    public void setFreightRateWm(Float freightRateWm) {
        this.freightRateWm = freightRateWm;
    }

    public Float getVolume() {
        return volume;
    }

    public void setVolume(Float volume) {
        this.volume = volume;
    }

    public Integer getExpectedPallets() {
        return expectedPallets;
    }

    public void setExpectedPallets(Integer expectedPallets) {
        this.expectedPallets = expectedPallets;
    }

    public Float getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(Float exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public String getDeliveryLocationNl() {
        return deliveryLocationNl;
    }

    public void setDeliveryLocationNl(String deliveryLocationNl) {
        this.deliveryLocationNl = deliveryLocationNl;
    }

    public Float getOceanfreightAmount() {
        return oceanfreightAmount;
    }

    public void setOceanfreightAmount(Float oceanfreightAmount) {
        this.oceanfreightAmount = oceanfreightAmount;
    }

    public Float getCfsChargesDest() {
        return cfsChargesDest;
    }

    public void setCfsChargesDest(Float cfsChargesDest) {
        this.cfsChargesDest = cfsChargesDest;
    }

    public Float getDelOrderFee() {
        return delOrderFee;
    }

    public void setDelOrderFee(Float delOrderFee) {
        this.delOrderFee = delOrderFee;
    }

    public Float getCustomsValue() {
        return customsValue;
    }

    public void setCustomsValue(Float customsValue) {
        this.customsValue = customsValue;
    }

    public Float getTransportDestCosts() {
        return transportDestCosts;
    }

    public void setTransportDestCosts(Float transportDestCosts) {
        this.transportDestCosts = transportDestCosts;
    }

    public Float getDieselSurcharge() {
        return dieselSurcharge;
    }

    public void setDieselSurcharge(Float dieselSurcharge) {
        this.dieselSurcharge = dieselSurcharge;
    }

    public Float getHandlingFeeLcl() {
        return handlingFeeLcl;
    }

    public void setHandlingFeeLcl(Float handlingFeeLcl) {
        this.handlingFeeLcl = handlingFeeLcl;
    }

    public String getFclLcl() {
        return fclLcl;
    }

    public void setFclLcl(String fclLcl) {
        this.fclLcl = fclLcl;
    }

    public String getContainerType() {
        return containerType;
    }

    public void setContainerType(String containerType) {
        this.containerType = containerType;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public Integer getRange() {
        return range;
    }

    public void setRange(Integer range) {
        this.range = range;
    }

    public String getDeltaEuromax() {
        return deltaEuromax;
    }

    public void setDeltaEuromax(String deltaEuromax) {
        this.deltaEuromax = deltaEuromax;
    }

    public Float getThcChargesCarrier() {
        return thcChargesCarrier;
    }

    public void setThcChargesCarrier(Float thcChargesCarrier) {
        this.thcChargesCarrier = thcChargesCarrier;
    }

    public Float getIsps() {
        return isps;
    }

    public void setIsps(Float isps) {
        this.isps = isps;
    }

    public Float getDeliveryOrderFee() {
        return deliveryOrderFee;
    }

    public void setDeliveryOrderFee(Float deliveryOrderFee) {
        this.deliveryOrderFee = deliveryOrderFee;
    }

    public Float getContainertransportToDestination() {
        return containertransportToDestination;
    }

    public void setContainertransportToDestination(Float containertransportToDestination) {
        this.containertransportToDestination = containertransportToDestination;
    }

    public Float getDeltaEuromaxSurcharge() {
        return deltaEuromaxSurcharge;
    }

    public void setDeltaEuromaxSurcharge(Float deltaEuromaxSurcharge) {
        this.deltaEuromaxSurcharge = deltaEuromaxSurcharge;
    }

    public Float getAllInHandlingFee() {
        return allInHandlingFee;
    }

    public void setAllInHandlingFee(Float allInHandlingFee) {
        this.allInHandlingFee = allInHandlingFee;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public PortCodes getRel_port_of_loading() {
        return rel_port_of_loading;
    }

    public void setRel_port_of_loading(PortCodes rel_port_of_loading) {
        this.rel_port_of_loading = rel_port_of_loading;
    }

    public ContainerTypes getRel_container_type() {
        return rel_container_type;
    }

    public void setRel_container_type(ContainerTypes rel_container_type) {
        this.rel_container_type = rel_container_type;
    }

    public Locations getRel_delivery_location_nl() {
        return rel_delivery_location_nl;
    }

    public void setRel_delivery_location_nl(Locations rel_delivery_location_nl) {
        this.rel_delivery_location_nl = rel_delivery_location_nl;
    }

}
