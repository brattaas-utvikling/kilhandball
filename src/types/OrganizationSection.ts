// types/OrganizationSection.ts
import { Member } from './member';
import React from 'react';

export type OrganizationSection = {
  title: string;
  icon: React.ReactNode;
  members: Member[];
};
