
package com.myproddb.data;

import java.util.Date;


/**
 *  myproddb.Booking
 *  11/30/2014 15:00:46
 * 
 */
public class Booking {

    private BookingId id;
    private String locationFrom;
    private String locationTo;
    private String countryFrom;
    private String countryTo;
    private String productCode;
    private String serviceCode1;
    private Float quantity;
    private String packageType;
    private String goodsDesc;
    private Float grossWeight;
    private Float netWeight;
    private String weightUnit;
    private Float volume;
    private String volumeUnit;
    private Float loadMeter;
    private String masterBookingId;
    private String bookingType;
    private String orderType;
    private String deliveryTerm;
    private String deliveryTermPlace;
    private Float invoiceAmount;
    private String invoiceNbr;
    private String invoiceCurrency;
    private String natureOfCargo;
    private Float codAmount;
    private String codCurrency;
    private String codAccount;
    private String bookingText;
    private Date pickupDate;
    private Date pickupTime;
    private Date pickupTimeTo;
    private String pickupTimeZone;
    private Date deliveryDate;
    private Date deliveryTime;
    private Date deliveryTimeTo;
    private String deliveryTimeZone;
    private Date orderDate;
    private Date orderTime;
    private String orderTimeZone;
    private Float statisticalValue;
    private Date creationDate;
    private Date creationTime;
    private String creationTimeZone;
    private String orderEntryDepot;
    private String servingDepot;
    private String handlingCode;
    private String fclLcl;

    public BookingId getId() {
        return id;
    }

    public void setId(BookingId id) {
        this.id = id;
    }

    public String getLocationFrom() {
        return locationFrom;
    }

    public void setLocationFrom(String locationFrom) {
        this.locationFrom = locationFrom;
    }

    public String getLocationTo() {
        return locationTo;
    }

    public void setLocationTo(String locationTo) {
        this.locationTo = locationTo;
    }

    public String getCountryFrom() {
        return countryFrom;
    }

    public void setCountryFrom(String countryFrom) {
        this.countryFrom = countryFrom;
    }

    public String getCountryTo() {
        return countryTo;
    }

    public void setCountryTo(String countryTo) {
        this.countryTo = countryTo;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getServiceCode1() {
        return serviceCode1;
    }

    public void setServiceCode1(String serviceCode1) {
        this.serviceCode1 = serviceCode1;
    }

    public Float getQuantity() {
        return quantity;
    }

    public void setQuantity(Float quantity) {
        this.quantity = quantity;
    }

    public String getPackageType() {
        return packageType;
    }

    public void setPackageType(String packageType) {
        this.packageType = packageType;
    }

    public String getGoodsDesc() {
        return goodsDesc;
    }

    public void setGoodsDesc(String goodsDesc) {
        this.goodsDesc = goodsDesc;
    }

    public Float getGrossWeight() {
        return grossWeight;
    }

    public void setGrossWeight(Float grossWeight) {
        this.grossWeight = grossWeight;
    }

    public Float getNetWeight() {
        return netWeight;
    }

    public void setNetWeight(Float netWeight) {
        this.netWeight = netWeight;
    }

    public String getWeightUnit() {
        return weightUnit;
    }

    public void setWeightUnit(String weightUnit) {
        this.weightUnit = weightUnit;
    }

    public Float getVolume() {
        return volume;
    }

    public void setVolume(Float volume) {
        this.volume = volume;
    }

    public String getVolumeUnit() {
        return volumeUnit;
    }

    public void setVolumeUnit(String volumeUnit) {
        this.volumeUnit = volumeUnit;
    }

    public Float getLoadMeter() {
        return loadMeter;
    }

    public void setLoadMeter(Float loadMeter) {
        this.loadMeter = loadMeter;
    }

    public String getMasterBookingId() {
        return masterBookingId;
    }

    public void setMasterBookingId(String masterBookingId) {
        this.masterBookingId = masterBookingId;
    }

    public String getBookingType() {
        return bookingType;
    }

    public void setBookingType(String bookingType) {
        this.bookingType = bookingType;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getDeliveryTerm() {
        return deliveryTerm;
    }

    public void setDeliveryTerm(String deliveryTerm) {
        this.deliveryTerm = deliveryTerm;
    }

    public String getDeliveryTermPlace() {
        return deliveryTermPlace;
    }

    public void setDeliveryTermPlace(String deliveryTermPlace) {
        this.deliveryTermPlace = deliveryTermPlace;
    }

    public Float getInvoiceAmount() {
        return invoiceAmount;
    }

    public void setInvoiceAmount(Float invoiceAmount) {
        this.invoiceAmount = invoiceAmount;
    }

    public String getInvoiceNbr() {
        return invoiceNbr;
    }

    public void setInvoiceNbr(String invoiceNbr) {
        this.invoiceNbr = invoiceNbr;
    }

    public String getInvoiceCurrency() {
        return invoiceCurrency;
    }

    public void setInvoiceCurrency(String invoiceCurrency) {
        this.invoiceCurrency = invoiceCurrency;
    }

    public String getNatureOfCargo() {
        return natureOfCargo;
    }

    public void setNatureOfCargo(String natureOfCargo) {
        this.natureOfCargo = natureOfCargo;
    }

    public Float getCodAmount() {
        return codAmount;
    }

    public void setCodAmount(Float codAmount) {
        this.codAmount = codAmount;
    }

    public String getCodCurrency() {
        return codCurrency;
    }

    public void setCodCurrency(String codCurrency) {
        this.codCurrency = codCurrency;
    }

    public String getCodAccount() {
        return codAccount;
    }

    public void setCodAccount(String codAccount) {
        this.codAccount = codAccount;
    }

    public String getBookingText() {
        return bookingText;
    }

    public void setBookingText(String bookingText) {
        this.bookingText = bookingText;
    }

    public Date getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(Date pickupDate) {
        this.pickupDate = pickupDate;
    }

    public Date getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(Date pickupTime) {
        this.pickupTime = pickupTime;
    }

    public Date getPickupTimeTo() {
        return pickupTimeTo;
    }

    public void setPickupTimeTo(Date pickupTimeTo) {
        this.pickupTimeTo = pickupTimeTo;
    }

    public String getPickupTimeZone() {
        return pickupTimeZone;
    }

    public void setPickupTimeZone(String pickupTimeZone) {
        this.pickupTimeZone = pickupTimeZone;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public Date getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(Date deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public Date getDeliveryTimeTo() {
        return deliveryTimeTo;
    }

    public void setDeliveryTimeTo(Date deliveryTimeTo) {
        this.deliveryTimeTo = deliveryTimeTo;
    }

    public String getDeliveryTimeZone() {
        return deliveryTimeZone;
    }

    public void setDeliveryTimeZone(String deliveryTimeZone) {
        this.deliveryTimeZone = deliveryTimeZone;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public String getOrderTimeZone() {
        return orderTimeZone;
    }

    public void setOrderTimeZone(String orderTimeZone) {
        this.orderTimeZone = orderTimeZone;
    }

    public Float getStatisticalValue() {
        return statisticalValue;
    }

    public void setStatisticalValue(Float statisticalValue) {
        this.statisticalValue = statisticalValue;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Date creationTime) {
        this.creationTime = creationTime;
    }

    public String getCreationTimeZone() {
        return creationTimeZone;
    }

    public void setCreationTimeZone(String creationTimeZone) {
        this.creationTimeZone = creationTimeZone;
    }

    public String getOrderEntryDepot() {
        return orderEntryDepot;
    }

    public void setOrderEntryDepot(String orderEntryDepot) {
        this.orderEntryDepot = orderEntryDepot;
    }

    public String getServingDepot() {
        return servingDepot;
    }

    public void setServingDepot(String servingDepot) {
        this.servingDepot = servingDepot;
    }

    public String getHandlingCode() {
        return handlingCode;
    }

    public void setHandlingCode(String handlingCode) {
        this.handlingCode = handlingCode;
    }

    public String getFclLcl() {
        return fclLcl;
    }

    public void setFclLcl(String fclLcl) {
        this.fclLcl = fclLcl;
    }

}
