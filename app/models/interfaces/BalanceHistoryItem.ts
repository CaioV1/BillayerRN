import Balance from "../schemas/BalanceSchema";

export default interface BalanceHistoryItemInterface {
  title: string;
  data: Array<Balance>;
}