import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const DietPlan = ({ mealPlan, dailyTotals }: any) => {
    console.log(mealPlan, dailyTotals);
    return (
        <div className="p-6 space-y-6 w-full">
            {/* Render each meal */}
            {Object.keys(mealPlan).map((mealName, index) => {
                const meal = mealPlan[mealName];

                return (
                    <Card key={index} className="border shadow-md p-4 w-1/2 m-auto">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold capitalize">{mealName.replace("_", " ")}</CardTitle>
                            <CardDescription className="text-sm text-gray-500">{meal.time}</CardDescription>
                        </CardHeader>
                        <CardContent className="mt-4">
                            {meal.items.map((item: any, idx: any) => (
                                <div key={idx} className="flex justify-between py-2 border-b">
                                    <div>
                                        <Label className="font-semibold">{item.name}</Label>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        <p>Protein: {item.macros.protein || "0g"}</p>
                                        <p>Carbs: {item.macros.carbs || "0g"}</p>
                                        <p>Fat: {item.macros.fat || "0g"}</p>
                                        {item.macros.calories && <p>Calories: {item.macros.calories}</p>}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                );
            })}

            {/* Daily Totals */}
            <div className="mt-8">
                <Card className="border shadow-md p-4">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Daily Totals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between py-2">
                            <p className="font-semibold">Calories:</p>
                            <p className="text-right">{dailyTotals.calories}</p>
                        </div>
                        <div className="flex justify-between py-2">
                            <p className="font-semibold">Protein:</p>
                            <p className="text-right">{dailyTotals.protein}</p>
                        </div>
                        <div className="flex justify-between py-2">
                            <p className="font-semibold">Carbs:</p>
                            <p className="text-right">{dailyTotals.carbs}</p>
                        </div>
                        <div className="flex justify-between py-2">
                            <p className="font-semibold">Fat:</p>
                            <p className="text-right">{dailyTotals.fat}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DietPlan;
