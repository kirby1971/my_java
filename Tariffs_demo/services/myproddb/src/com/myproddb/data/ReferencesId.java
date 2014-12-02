
package com.myproddb.data;

import java.io.Serializable;


/**
 *  myproddb.ReferencesId
 *  11/30/2014 15:00:46
 * 
 */
public class ReferencesId
    implements Serializable
{

    private String bookingId;
    private String accountId;
    private String referenceType;
    private Float lineNumber;

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof ReferencesId)) {
            return false;
        }
        ReferencesId other = ((ReferencesId) o);
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
        if (this.referenceType == null) {
            if (other.referenceType!= null) {
                return false;
            }
        } else {
            if (!this.referenceType.equals(other.referenceType)) {
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
        if (this.referenceType!= null) {
            rtn = (rtn + this.referenceType.hashCode());
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

    public String getReferenceType() {
        return referenceType;
    }

    public void setReferenceType(String referenceType) {
        this.referenceType = referenceType;
    }

    public Float getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(Float lineNumber) {
        this.lineNumber = lineNumber;
    }

}
