import React from "react";
import UpcomingLaunches from "./UpcomingLaunches";
import ISSExperiments from "./ISSExperiments";
import SpaceWeatherCME from "./SpaceWeatherCME";
import ConjunctionAlerts from "./ConjunctionAlerts";

export default function DataDashboard() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UpcomingLaunches />
      <ISSExperiments />
      <SpaceWeatherCME />
      <ConjunctionAlerts />
    </section>
  );
}
