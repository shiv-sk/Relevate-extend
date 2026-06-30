export enum ApplicationStatus {
  Applied = 'Applied',
  Rejected = 'Rejected',
  Connected = 'Connected',
  Withdrawn = 'Withdrawn',
  Viewed = 'Viewed',
}

export enum SalaryExcepted {
  ThreeToFive = '3 - 5',
  FiveToEight = '5 - 8',
  MoreThanEight = '8+',
}

export enum PreferredLocation {
  onsiteOnly = 'OnsiteOnly',
  remoteOnly = 'RemoteOnly',
  hybrid = 'Hybrid',
  allOfTheAbove = 'Onsite/Remote/Hybrid',
}

export enum Availability {
  immediate = 'immediate',
  zeroToFifteen = '0 - 15',
  fifteenToThirty = '15 - 30',
  moreThanThirty = '30+',
}

export enum Experience {
  zeroToTwo = '0 - 2',
  twoToFive = '2 - 5',
  moreThanFive = '5+',
}
