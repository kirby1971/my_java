
package com.myproddb.data;

import java.util.Date;


/**
 *  myproddb.Events
 *  11/30/2014 15:00:46
 * 
 */
public class Events {

    private EventsId id;
    private String eventType;
    private Date eventActualTime;
    private String eventLocationType;
    private String eventLocation;
    private String eventCountry;
    private String eventReference;
    private String eventReason;
    private String eventText;
    private Date eventExpectedDate;
    private Date eventExpectedTime;
    private String eventCreationType;
    private Date creationDateTimeStamp;
    private String deliveredTo;
    private String dispatchNbr;
    private String problemSource;
    private String retentionCode;
    private String transportMode;
    private String lastEvent;

    public EventsId getId() {
        return id;
    }

    public void setId(EventsId id) {
        this.id = id;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public Date getEventActualTime() {
        return eventActualTime;
    }

    public void setEventActualTime(Date eventActualTime) {
        this.eventActualTime = eventActualTime;
    }

    public String getEventLocationType() {
        return eventLocationType;
    }

    public void setEventLocationType(String eventLocationType) {
        this.eventLocationType = eventLocationType;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public String getEventCountry() {
        return eventCountry;
    }

    public void setEventCountry(String eventCountry) {
        this.eventCountry = eventCountry;
    }

    public String getEventReference() {
        return eventReference;
    }

    public void setEventReference(String eventReference) {
        this.eventReference = eventReference;
    }

    public String getEventReason() {
        return eventReason;
    }

    public void setEventReason(String eventReason) {
        this.eventReason = eventReason;
    }

    public String getEventText() {
        return eventText;
    }

    public void setEventText(String eventText) {
        this.eventText = eventText;
    }

    public Date getEventExpectedDate() {
        return eventExpectedDate;
    }

    public void setEventExpectedDate(Date eventExpectedDate) {
        this.eventExpectedDate = eventExpectedDate;
    }

    public Date getEventExpectedTime() {
        return eventExpectedTime;
    }

    public void setEventExpectedTime(Date eventExpectedTime) {
        this.eventExpectedTime = eventExpectedTime;
    }

    public String getEventCreationType() {
        return eventCreationType;
    }

    public void setEventCreationType(String eventCreationType) {
        this.eventCreationType = eventCreationType;
    }

    public Date getCreationDateTimeStamp() {
        return creationDateTimeStamp;
    }

    public void setCreationDateTimeStamp(Date creationDateTimeStamp) {
        this.creationDateTimeStamp = creationDateTimeStamp;
    }

    public String getDeliveredTo() {
        return deliveredTo;
    }

    public void setDeliveredTo(String deliveredTo) {
        this.deliveredTo = deliveredTo;
    }

    public String getDispatchNbr() {
        return dispatchNbr;
    }

    public void setDispatchNbr(String dispatchNbr) {
        this.dispatchNbr = dispatchNbr;
    }

    public String getProblemSource() {
        return problemSource;
    }

    public void setProblemSource(String problemSource) {
        this.problemSource = problemSource;
    }

    public String getRetentionCode() {
        return retentionCode;
    }

    public void setRetentionCode(String retentionCode) {
        this.retentionCode = retentionCode;
    }

    public String getTransportMode() {
        return transportMode;
    }

    public void setTransportMode(String transportMode) {
        this.transportMode = transportMode;
    }

    public String getLastEvent() {
        return lastEvent;
    }

    public void setLastEvent(String lastEvent) {
        this.lastEvent = lastEvent;
    }

}
