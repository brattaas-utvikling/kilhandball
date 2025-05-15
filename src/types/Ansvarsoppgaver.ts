import { AnsvarMedlem } from "./AnsvarMedlem";

export type Ansvarsoppgaver = {
  title: string;
  description: string;
  icon: React.ReactNode;
  members: AnsvarMedlem[];
};