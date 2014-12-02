
package com.myproddb.data;

import java.io.Serializable;


/**
 *  myproddb.DetailsId
 *  11/30/2014 15:00:46
 * 
 */
public class DetailsId
    implements Serializable
{

    private String bookingId;
    private String accountId;
    private Float lineNumber;

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof DetailsId)) {
            return false;
        }
        DetailsId other = ((DetailsId) o);
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
        if (this.lineNumber == null) {
            if (other.lineNumber!= null) {
                return false;
            }
        } else {
            if (!this.lineNumber.equals(other.lineNumber)) {
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
        if (this.lineNumber!= null) {
            rtn = (rtn + this.lineNumber.hashCode());
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

    public Float getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(Float lineNumber) {
        this.lineNumber = lineNumber;
    }

}
