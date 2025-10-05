import React from "react";
import type { UserRole } from "@/types/roles";
import ROIModel from "@/views/investor/ROIModel";
import MarketTrends from "@/views/investor/MarketTrends";
import VoucherCalls from "@/views/entrepreneur/VoucherCalls";
import LicensingRoadmap from "@/views/entrepreneur/LicensingRoadmap";
import Marketplace from "@/views/business/Marketplace";
import PolicyMonitor from "@/views/agency/PolicyMonitor";
import UpcomingLaunches from "@/components/data/UpcomingLaunches";
import ISSExperiments from "@/components/data/ISSExperiments";
import SpaceWeatherCME from "@/components/data/SpaceWeatherCME";
import ConjunctionAlerts from "@/components/data/ConjunctionAlerts";
import EntrepreneurHeader from "@/components/entrepreneur/EntrepreneurHeader";

export const roleViews: Record<UserRole, React.ReactNode[]> = {
  investor: [<UpcomingLaunches key="ll2"/>, <MarketTrends key="mt"/>, <ROIModel key="roi"/>, <SpaceWeatherCME key="cme"/>],
  entrepreneur: [
    <EntrepreneurHeader
      key="ent-head"
      onApplyVoucher={() => window.open("/orbit-hub#voucher-form", "_blank")}
      onOpenOnboarding={() => window.open("/orbit-hub#onboarding-kit", "_blank")}
      onFindProvider={() => window.open("/orbit-hub#providers", "_blank")}
    />,
    <VoucherCalls key="vc" />,
    <LicensingRoadmap key="lic" />,
    <ISSExperiments key="iss" />,
    <UpcomingLaunches key="ll2" />,
    <ConjunctionAlerts key="cdm" />,
    <SpaceWeatherCME key="cme" />,
  ],
  business: [<Marketplace key="mk"/>, <UpcomingLaunches key="ll2"/>, <ConjunctionAlerts key="cdm"/>],
  agency: [<PolicyMonitor key="pol"/>, <UpcomingLaunches key="ll2"/>, <ISSExperiments key="iss"/>, <SpaceWeatherCME key="cme"/>, <ConjunctionAlerts key="cdm"/>],
};
