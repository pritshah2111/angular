export interface MenuI {
  name: string;
  route: string;
  icon: string;
  subMenu?: MenuI[];
}
