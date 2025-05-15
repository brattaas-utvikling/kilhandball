export type AnsvarMedlem = {
  title: string;
  icon: React.ReactNode;
  member: {
    name: string;
    avatar: string;
    role: string;
    email: string;
    phone: number;
  };
};
