
package com.myproddb.data;

import java.io.Serializable;
import java.util.Date;


/**
 *  myproddb.BookingLinksId
 *  11/30/2014 15:00:46
 * 
 */
public class BookingLinksId
    implements Serializable
{

    private String userId;
    private Integer tariffSeq;
    private Date dataTime;
    private String portOfLoading;

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof BookingLinksId)) {
            return false;
        }
        BookingLinksId other = ((BookingLinksId) o);
        if (this.userId == null) {
            if (other.userId!= null) {
                return false;
            }
        } else {
            if (!this.userId.equals(other.userId)) {
                return false;
            }
        }
        if (this.tariffSeq == null) {
            if (other.tariffSeq!= null) {
                return false;
            }
        } else {
            if (!this.tariffSeq.equals(other.tariffSeq)) {
                return false;
            }
        }
        if (this.dataTime == null) {
            if (other.dataTime!= null) {
                return false;
            }
        } else {
            if (!this.dataTime.equals(other.dataTime)) {
                return false;
            }
        }
        if (this.portOfLoading == null) {
            if (other.portOfLoading!= null) {
                return false;
            }
        } else {
            if (!this.portOfLoading.equals(other.portOfLoading)) {
                return false;
            }
        }
        return true;
    }

    public int hashCode() {
        int rtn = 17;
        rtn = (rtn* 37);
        if (this.userId!= null) {
            rtn = (rtn + this.userId.hashCode());
        }
        rtn = (rtn* 37);
        if (this.tariffSeq!= null) {
            rtn = (rtn + this.tariffSeq.hashCode());
        }
        rtn = (rtn* 37);
        if (this.dataTime!= null) {
            rtn = (rtn + this.dataTime.hashCode());
        }
        rtn = (rtn* 37);
        if (this.portOfLoading!= null) {
            rtn = (rtn + this.portOfLoading.hashCode());
        }
        return rtn;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getTariffSeq() {
        return tariffSeq;
    }

    public void setTariffSeq(Integer tariffSeq) {
        this.tariffSeq = tariffSeq;
    }

    public Date getDataTime() {
        return dataTime;
    }

    public void setDataTime(Date dataTime) {
        this.dataTime = dataTime;
    }

    public String getPortOfLoading() {
        return portOfLoading;
    }

    public void setPortOfLoading(String portOfLoading) {
        this.portOfLoading = portOfLoading;
    }

}
