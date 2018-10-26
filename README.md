# marine-cpa-tcpa
Calculate the closest point of approach (CPA) and time to point of closest approach (TCPA) between two vessels given each vessel's:
* Latitude and Longitude in decimal degrees (N and E positive)
* Speed over ground (SOG) in knots
* Course over ground (COG) in degrees (true)

CPA is returned in nautical miles.

TCPA is returned in seconds (from now); including negative seconds if the CPA was in the past.
