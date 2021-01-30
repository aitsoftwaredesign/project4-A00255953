package com.bookingally.service.venue.pojo;

import java.time.DayOfWeek;

/**
 * A POJO representation of the business hours for a particular day in a business week {@link Venue}.
 * @author Nicholas Murray
 */
public class BusinessDay {

    private DayOfWeek day;

    /**
     * The opening and closing time for the business on the given day of the week in 24hr format.
     * Format: (Opening time):(Closing time) HH_MM:HH_MM eg... 09_30:17_30
     * Default value is "00_00:00_00" this will indicate the business is not open this day.
     */
    private String businessHours = "00_00:00_00";

    /**
     * The optional break/lunch times for the business given in 24hr format.
     * Format: (Opening time):(Closing time) HH_MM:HH_MM eg... 12_30:13_30
     * Default value is "00_00:00_00" this will indicate the business does not close for a break.
     */
    private String breakTime = "00_00:00_00";

    public BusinessDay() {}

    public BusinessDay(DayOfWeek day) {
        setDay(day);
    }

    public BusinessDay(DayOfWeek day, String businessHours) {
        setDay(day);
        setBusinessHours(businessHours);
    }

    public BusinessDay(DayOfWeek day, String businessHours, String breakTime) {
        setDay(day);
        setBusinessHours(businessHours);
        setBreakTime(breakTime);
    }



    public DayOfWeek getDay() {
        return day;
    }

    public void setDay(DayOfWeek day) {
        this.day = day;
    }

    public String getBusinessHours() {
        return businessHours;
    }

    public void setBusinessHours(String businessHours) {
        this.businessHours = businessHours;
    }

    public String getBreakTime() {
        return breakTime;
    }

    public void setBreakTime(String breakTime) {
        this.breakTime = breakTime;
    }
}
