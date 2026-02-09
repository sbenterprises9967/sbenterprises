// src/assets/we-provide/index.js

import canopy1 from "./canopy-1.jpg";
import easel from "./easel.jpg";
import foamBanners from "./foam-banners-1.jpg";
import gazebo from "./gazebo.jpg";
import luxuryRoll from "./luxury-roll.jpg";
import promoTable from "./promo-table.jpg";
import pvcBalloon from "./pvc-balloon.jpg";
import queueManager from "./queue-manager.jpg";
import rollupStandee from "./roll-up-standee.jpg";
import umbrella2Fold from "./umbrella-2-fold.jpg";
import umbrellaGolf from "./umbrella-golf.jpg";
import umbrellaJHandle from "./umbrella-j-handle.jpg";

// ✅ map by your product label (keys must match WHAT_WE_PROVIDE values)
export const WE_PROVIDE_IMAGES = {
  "Roll-up Standee": rollupStandee,
  "Luxury Roll-up Standee": luxuryRoll,
  "Canopy/Tent": canopy1,
  "Gazebo Tent": gazebo,
  "LD Foam Banners": foamBanners,
  "Promo Table": promoTable,
  "PVC Balloons": pvcBalloon,
  "Queue Manager": queueManager,
  "Umbrella 2 Fold": umbrella2Fold,
  "Umbrella - Golf": umbrellaGolf,
  "Umbrella J-Handle": umbrellaJHandle,
  // if you have “Easel Stand” in list:
  "Easel Stand": easel,
};

// optional fallback (choose one)
export const WE_PROVIDE_FALLBACK = rollupStandee;
