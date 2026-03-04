import React from 'react';
import { GiEarthAmerica } from 'react-icons/gi';
import { MdAirplanemodeActive, MdTimer } from 'react-icons/md';
import { FaMoneyCheck } from 'react-icons/fa';

export interface StatsDataItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
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
    title: 'Over 100 Destinations',
    desc: 'Travel to over 100 unique places',
  },
  {
    icon: <MdAirplanemodeActiveIcon />,
    title: '1 Million Trips Made',
    desc: 'Over 1 million trips completed last year',
  },
  {
    icon: <MdTimerIcon />,
    title: 'Fastest Support',
    desc: 'Access our support team 24/7',
  },
  {
    icon: <FaMoneyCheckIcon />,
    title: 'Best Deals',
    desc: 'We offer the best prices',
  },
];
