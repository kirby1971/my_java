
package com.myproddb.data;



/**
 *  myproddb.Details
 *  11/30/2014 15:00:46
 * 
 */
public class Details {

    private DetailsId id;
    private Float quantity;
    private String packageType;
    private String goodsDesc;
    private String marksNumbers;
    private Float grossWeight;
    private Float netWeight;
    private String weightUnit;
    private Float volume;
    private String volumeUnit;

    public DetailsId getId() {
        return id;
    }

    public void setId(DetailsId id) {
        this.id = id;
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

    public String getMarksNumbers() {
        return marksNumbers;
    }

    public void setMarksNumbers(String marksNumbers) {
        this.marksNumbers = marksNumbers;
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

}
