package com.bookingally.service.common.util;

public class VariableRetriever {

    /**
     * This will retrieve a variable from either system properties or
     * environmental variables in that order.
     * @param name - the name of the variable to retrieve
     * @return the retrieved variable, if no variable is found null will be retured.
     */
    public static String getVariable(String name) {

        String value = "";

        value = System.getProperty(name);
        if(value == null ) {
            name = System.getenv(name);
        }

        return name;
    }

    /**
     * This will retrieve a variable from either system properties or
     * environmental variables in that order.
     * @param name - the name of the variable to retrieve
     * @param def - the default value to use if nothing is found.
     * @return the retrieved variable, if no variable is found null will be retured.
     */
    public static String getVariable(String name, String def) {

        String value = "";

        value = System.getProperty(name);
        if(value == null ) {
            name = System.getenv(name);
        }

        if(name == null) {
            name = def;
        }
        return name;
    }
}
