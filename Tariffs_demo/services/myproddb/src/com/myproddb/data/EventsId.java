
package com.myproddb.data;

import java.io.Serializable;
import java.util.Date;


/**
 *  myproddb.EventsId
 *  11/30/2014 15:00:46
 * 
 */
public class EventsId
    implements Serializable
{

    private String bookingId;
    private String accountId;
    private String packageId;
    private String eventCode;
    private Date eventActualDate;

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof EventsId)) {
            return false;
        }
        EventsId other = ((EventsId) o);
        if (this.bookingId == null) {
            if (other.bookingId!= null) {
                return false;
            }
        } else {
            if (!this.bookingId.equals(other.bookingId)) {
                return false;
            }
        }
        if (this.accountId == null) {
            if (other.accountId!= null) {
                return false;
            }
        } else {
            if (!this.accountId.equals(other.accountId)) {
                return false;
            }
        }
        if (this.packageId == null) {
            if (other.packageId!= null) {
                return false;
            }
        } else {
            if (!this.packageId.equals(other.packageId)) {
                return false;
            }
        }
        if (this.eventCode == null) {
            if (other.eventCode!= null) {
                return false;
            }
        } else {
            if (!this.eventCode.equals(other.eventCode)) {
                return false;
            }
        }
        if (this.eventActualDate == null) {
            if (other.eventActualDate!= null) {
                return false;
            }
        } else {
            if (!this.eventActualDate.equals(other.eventActualDate)) {
                return false;
            }
        }
        return true;
    }

    public int hashCode() {
        int rtn = 17;
        rtn = (rtn* 37);
        if (this.bookingId!= null) {
            rtn = (rtn + this.bookingId.hashCode());
        }
        rtn = (rtn* 37);
        if (this.accountId!= null) {
            rtn = (rtn + this.accountId.hashCode());
        }
        rtn = (rtn* 37);
        if (this.packageId!= null) {
            rtn = (rtn + this.packageId.hashCode());
        }
        rtn = (rtn* 37);
        if (this.eventCode!= null) {
            rtn = (rtn + this.eventCode.hashCode());
        }
        rtn = (rtn* 37);
        if (this.eventActualDate!= null) {
            rtn = (rtn + this.eventActualDate.hashCode());
        }
        return rtn;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getPackageId() {
        return packageId;
    }

    public void setPackageId(String packageId) {
        this.packageId = packageId;
    }

    public String getEventCode() {
        return eventCode;
    }

    public void setEventCode(String eventCode) {
        this.eventCode = eventCode;
    }

    public Date getEventActualDate() {
        return eventActualDate;
    }

    public void setEventActualDate(Date eventActualDate) {
        this.eventActualDate = eventActualDate;
    }

}
