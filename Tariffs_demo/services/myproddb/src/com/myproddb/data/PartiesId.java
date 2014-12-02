
package com.myproddb.data;

import java.io.Serializable;


/**
 *  myproddb.PartiesId
 *  11/30/2014 15:00:46
 * 
 */
public class PartiesId
    implements Serializable
{

    private String bookingId;
    private String accountId;
    private String partyType;

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof PartiesId)) {
            return false;
        }
        PartiesId other = ((PartiesId) o);
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
        if (this.partyType == null) {
            if (other.partyType!= null) {
                return false;
            }
        } else {
            if (!this.partyType.equals(other.partyType)) {
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
        if (this.partyType!= null) {
            rtn = (rtn + this.partyType.hashCode());
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

    public String getPartyType() {
        return partyType;
    }

    public void setPartyType(String partyType) {
        this.partyType = partyType;
    }

}
