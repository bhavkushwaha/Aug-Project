import { clsx, type ClassValue } from "clsx"
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function covertAmountFromMilliunits(amount : number){
  return amount / 1000;
};

export function covertAmountToMilliunits(amount : number){
  return Math.round(amount * 1000);
};

export function formatCurrency( value : number ) {
  return Intl.NumberFormat("en-US", {
      style : "currency",
      currency : "USD",
      minimumFractionDigits : 2,      
  }).format(value);
};

export function calculatePercentageChange(
  current: number,
  previous: number,
): number {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
};

export function fillMissingDays(
  activeDays: {
    date: Date;
    income: number;
    expense: number;
  }[],
  startDate: Date,
  endDate: Date,
) {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expense: 0,
      };
    }
  });

  return transactionsByDay;
}
