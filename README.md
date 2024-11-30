# Booking Panel Assignment

## Overview

In this assignment, you will create a booking system using REACT. The booking panel has four steps. The objective is to create
a booking by completing all four steps.

## Reference

https://sabyasachi.closewise-notary.com/booking?tab=1

## API DOCS LINK:

https://api-dev.closewise.com/docs

## Step One (Basic Details) (20 points)

1. Radio button functionality (5 points)
2. You need to create a multi level forms with validations. (10 points)
3. User can't go to steps two without all required data.
4. In the form you will get a dropdown of Languages.
   If user select other Language then user will get a input box to fill up.
5. You to hold data if user cameback to step one again. (5 points)

## Step two (Signing & Product Type) (20 points)

1. Signing Type Radio button functionality (2 points)
2. Product Type (10 points)
   - Need to fetch data from api (https://api-dev.closewise.com/docs/#api-Agent_Website-agentWebsiteStandardFeesDetails)
     use standardFees array to create product type UI.
   - We will take only those product which have `productValue > 0` and
     create tabs with `productCategory`.
   - User can select multiple product type.
   - Keep in mind, We need to calculate total product cost for Step 4.
3. Witness Number (2 points)
   a. User only type number. We can accept 0 as number
4. Total Booking cost calculation
   `(product1 + product2 + productN) * Witness Number`
5. You to hold data if user cameback to step two again. (6 points)
6. User can't go to steps two without all required data.

## Step Three (Appointment Details) (20 points)

1. User have to search Appointment location using google search and
   selcet only valid address. (8 points)
   - Required if `signingType === "Mobile"`
2. Select date => Can't select past date. (2 points)
3. Time Zone => This will disable if `signingType === "Mobile"`
   Not required if `signingType === "RON"` (2 points)
4. Time should not be the past time. (2 points)
5. You to hold data if user cameback to step two again. (6 points)
6. User can't go to steps two without all required data.

## Step Four (Booking and Payment) (20 points)

### Booking (7 Points)

1. Email => Uesr need to verify email. (5 points)
2. Name and Phone number is Required. (2 points)
3. Add basic validation.

### Payment (13 points)

1. You have to calculate Total Fee. (5 points)
2. Integrate Stripe. (8 points)

### Bonous Points (10 points)

1. Otp Timer for 60 seconds. (5 points)
2. Text change according to user flow. (5 points)
   Like: `Email Verified`, `Otp Send` etc
   - Text and button change accordingly (Please check `BookingStep4` component).

## Over all Points (10 points)

1. On successfully create Booking. (5 points)
2. Manage All Steps with proper UI. (5 points)

## TOTAL: 100 points

You Can use this AGENT ID for API CALL
AGENT_ID: `63997eef2475d90ca5205bd2`
