
package com.myproddb.data;

import java.io.Serializable;


/**
 *  myproddb.BookingId
 *  11/30/2014 15:00:46
 * 
 */
public class BookingId
    implements Serializable
{

    private String bookingId;
    private String accountId;

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof BookingId)) {
            return false;
        }
        BookingId other = ((BookingId) o);
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

}
