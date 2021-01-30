package com.bookingally.service.venue.pojo;

import java.time.DayOfWeek;

/**
 * A POJO representation of the business week for a particular {@link Venue}.
 * @author Nicholas Murray
 */
public class BusinessWeek {

    private BusinessDay monday;
    private BusinessDay tuesday;
    private BusinessDay wednesday;
    private BusinessDay thursday;
    private BusinessDay friday;
    private BusinessDay saturday;
    private BusinessDay sunday;

    public BusinessWeek() {
        setMonday(new BusinessDay(DayOfWeek.MONDAY));
        setTuesday(new BusinessDay(DayOfWeek.TUESDAY));
        setWednesday(new BusinessDay(DayOfWeek.WEDNESDAY));
        setThursday(new BusinessDay(DayOfWeek.THURSDAY));
        setFriday(new BusinessDay(DayOfWeek.FRIDAY));
        setSaturday(new BusinessDay(DayOfWeek.SATURDAY));
        setSunday(new BusinessDay(DayOfWeek.SUNDAY));
    }

    /**
     * Set the business days using a given array of {@link BusinessDay} of size 7.
     * @param businessDays - an array of business days of size 7
     */
    public BusinessWeek(BusinessDay[] businessDays) {
        try {
            setMonday(businessDays[0]);
            setTuesday(businessDays[1]);
            setWednesday(businessDays[2]);
            setThursday(businessDays[3]);
            setFriday(businessDays[4]);
            setSaturday(businessDays[5]);
            setSunday(businessDays[6]);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Set the business days using the given set of business days. Use null for days that the business is not open.
     * @param monday
     * @param tuesday
     * @param wednesday
     * @param thursday
     * @param friday
     * @param saturday
     * @param sunday
     */
    public BusinessWeek(BusinessDay monday, BusinessDay tuesday, BusinessDay wednesday,
                        BusinessDay thursday, BusinessDay friday, BusinessDay saturday, BusinessDay sunday) {
        setMonday(monday);
        setTuesday(tuesday);
        setWednesday(wednesday);
        setThursday(thursday);
        setFriday(thursday);
        setSaturday(saturday);
        setSunday(sunday);
    }

    public BusinessDay getMonday() {
        return monday;
    }

    public void setMonday(BusinessDay monday) {
        this.monday = monday;
    }

    public BusinessDay getTuesday() {
        return tuesday;
    }

    public void setTuesday(BusinessDay tuesday) {
        this.tuesday = tuesday;
    }

    public BusinessDay getWednesday() {
        return wednesday;
    }

    public void setWednesday(BusinessDay wednesday) {
        this.wednesday = wednesday;
    }

    public BusinessDay getThursday() {
        return thursday;
    }

    public void setThursday(BusinessDay thursday) {
        this.thursday = thursday;
    }

    public BusinessDay getFriday() {
        return friday;
    }

    public void setFriday(BusinessDay friday) {
        this.friday = friday;
    }

    public BusinessDay getSaturday() {
        return saturday;
    }

    public void setSaturday(BusinessDay saturday) {
        this.saturday = saturday;
    }

    public BusinessDay getSunday() {
        return sunday;
    }

    public void setSunday(BusinessDay sunday) {
        this.sunday = sunday;
    }
}
