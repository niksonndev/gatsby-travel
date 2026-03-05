import React from 'react';
import { GiEarthAmerica } from 'react-icons/gi';
import { MdAirplanemodeActive, MdTimer } from 'react-icons/md';
import { FaMoneyCheck } from 'react-icons/fa';

export interface StatsDataItem {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
}

const GiEarthAmericaIcon = () => (
  <GiEarthAmerica css={`color: #047bf1;`} />
);

const MdAirplanemodeActiveIcon = () => (
  <MdAirplanemodeActive css={`color: #f3a82e;`} />
);

const MdTimerIcon = () => (
  <MdTimer css={`color: #f34f2e;`} />
);

const FaMoneyCheckIcon = () => (
  <FaMoneyCheck css={`color: #3af576;`} />
);

export const StatsData: StatsDataItem[] = [
  {
    icon: <GiEarthAmericaIcon />,
    titleKey: 'stats.items.over100.title',
    descKey: 'stats.items.over100.desc',
  },
  {
    icon: <MdAirplanemodeActiveIcon />,
    titleKey: 'stats.items.millionTrips.title',
    descKey: 'stats.items.millionTrips.desc',
  },
  {
    icon: <MdTimerIcon />,
    titleKey: 'stats.items.fastSupport.title',
    descKey: 'stats.items.fastSupport.desc',
  },
  {
    icon: <FaMoneyCheckIcon />,
    titleKey: 'stats.items.bestDeals.title',
    descKey: 'stats.items.bestDeals.desc',
  },
];
