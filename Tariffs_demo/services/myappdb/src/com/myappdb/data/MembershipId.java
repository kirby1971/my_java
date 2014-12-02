
package com.myappdb.data;

import java.io.Serializable;


/**
 *  myappdb.MembershipId
 *  11/28/2014 23:40:56
 * 
 */
public class MembershipId
    implements Serializable
{

    private String userId;
    private String role;

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof MembershipId)) {
            return false;
        }
        MembershipId other = ((MembershipId) o);
        if (this.userId == null) {
            if (other.userId!= null) {
                return false;
            }
        } else {
            if (!this.userId.equals(other.userId)) {
                return false;
            }
        }
        if (this.role == null) {
            if (other.role!= null) {
                return false;
            }
        } else {
            if (!this.role.equals(other.role)) {
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
        if (this.role!= null) {
            rtn = (rtn + this.role.hashCode());
        }
        return rtn;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
