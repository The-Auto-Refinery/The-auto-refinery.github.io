/**
 * This is a helper script to document the pattern for removing service sections
 * from city pages. This isn't meant to be included in the site, just used as
 * a reference for the manual edits needed.
 */

// Pattern to look for and remove:
// 1. Find sections with class "location-services" or similar that contain service listings
// 2. Remove the entire section including headers related to services
// 3. Preserve the rest of the page content

// Example removal pattern:
/*
<div class="location-services">
    <h2>Our Mobile Detailing Services in [CityName]</h2>
    ... service content ...
</div>

OR 

<section class="service-items">
    <h2>Mobile Auto Detailing Services in [CityName]</h2>
    ... service items ...
</section>

OR

<div class="service-section">
    ... service content ...
</div>
*/
