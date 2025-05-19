import { NextRequest, NextResponse } from "next/server";
import { getHolidays, createHoliday } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get("active") === "true";
    const format = searchParams.get("format");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    const holidays = await getHolidays(onlyActive);

    let filteredHolidays = holidays;
    if (month || year) {
      filteredHolidays = holidays.filter(holiday => {
        const holidayDate = new Date(holiday.date);
        
        const hasDateRange = holiday.endDate && holiday.endDate !== holiday.date;
        const endDate = hasDateRange ? new Date(holiday.endDate as string) : holidayDate;
        
       
        const currentDate = new Date(holidayDate);
        while (currentDate <= endDate) {
          const currentMonth = currentDate.getMonth() + 1;
          const currentYear = currentDate.getFullYear();
          
          
          if (month && year) {
            if (currentMonth === parseInt(month) && currentYear === parseInt(year)) {
              return true;
            }
          } else if (month) {
           
            if (currentMonth === parseInt(month)) {
              return true;
            }
          } else if (year) {
            if (currentYear === parseInt(year)) {
              return true;
            }
          }
          
          
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return false;
      });
    }

    if (format === "raw") {
      return NextResponse.json(filteredHolidays);
    }

    return NextResponse.json({
      message: "Holidays retrieved successfully",
      holidays: filteredHolidays,
      count: filteredHolidays.length,
    });
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch holidays",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { date, name, type, active = true } = body;

    if (!date || !name || !type) {
      return NextResponse.json(
        { message: "Date, name, and type are required" },
        { status: 400 }
      );
    }
    
    if (type === 'other' && !body.customType) {
      return NextResponse.json(
        { message: "Custom type is required when type is 'other'" },
        { status: 400 }
      );
    }
    
    if (body.endDate && body.endDate < date) {
      return NextResponse.json(
        { message: "End date must be after start date" },
        { status: 400 }
      );
    }

    const newHoliday = await createHoliday({
      date,
      endDate: body.endDate,
      name,
      type,
      customType: body.customType,
      description: body.description,
      active,
    });

    return NextResponse.json(
      {
        message: "Holiday added successfully",
        holiday: newHoliday,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating holiday:", error);
    return NextResponse.json(
      {
        message: "Failed to create holiday",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}