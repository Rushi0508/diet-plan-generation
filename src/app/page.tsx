'use client'
import React, { useState, useRef, useEffect } from 'react'; // Import useState
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import DietPlan from './components/DietPlan';

type FormValues = {
  basicInfo: {
    age: string;
    weight: string;
    height: string;
  };
  dietaryPreferences: {
    dietType: string;
    intolerances: string[];
  };
  healthGoals: {
    goal: string;
    activityLevel: string;
  };
  lifeStyleDetails: {
    workEnvironment: string;
    sleepSchedule: string;
  };
};

export default function Home() {
  const [formValues, setFormValues] = useState<FormValues>({ // Create state for form values
    basicInfo: {
      age: '',
      weight: '',
      height: ''
    },
    dietaryPreferences: {
      dietType: '',
      intolerances: []
    },
    healthGoals: {
      goal: '',
      activityLevel: ''
    },
    lifeStyleDetails: {
      workEnvironment: '',
      sleepSchedule: ''
    }
  });

  const [generating, setGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [Response, setResponse] = useState<any>();

  const dietPlanRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isGenerated && dietPlanRef.current) {
      dietPlanRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to DietPlan
    }
  }, [isGenerated]);


  const generatePlan = async () => {
    try {
      setGenerating(true)
      setIsGenerated(false)
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.hasOwnProperty("meal_plan")) {
        setResponse(data)
        setIsGenerated(true)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setGenerating(false)
    }
  }


  return (
    <div className="flex flex-col items-center">
      <div className="text-center m-4 p-4">
        <p className="text-4xl font-semibold tracking-wide">Generate Your Diet Plan</p>
        <p className="opacity-70 my-2">Get started by entering your preferences</p>
      </div>
      {/* Basic Information  */}
      <Accordion className="w-1/2 m-auto" key="basic-info" type="single" collapsible>
        <AccordionItem value="0">
          <AccordionTrigger>
            <div className="flex justify-between items-center p-2">
              <p className="text-lg font-semibold opacity-80">Basic Information</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-2 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Age</Label>
                  <Input
                    type="number"
                    value={formValues.basicInfo.age} // Bind value to state
                    onChange={(e) => setFormValues(prevState => ({
                      ...prevState,
                      basicInfo: {
                        ...prevState.basicInfo,
                        age: e.target.value
                      }
                    }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Weight</Label>
                  <Input
                    type="number"
                    value={formValues.basicInfo.weight} // Bind value to state
                    onChange={(e) => setFormValues(prevState => ({
                      ...prevState,
                      basicInfo: {
                        ...prevState.basicInfo,
                        weight: e.target.value
                      }
                    }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Height</Label>
                  <Input
                    type="number"
                    value={formValues.basicInfo.height} // Bind value to state
                    onChange={(e) => setFormValues(prevState => ({
                      ...prevState,
                      basicInfo: {
                        ...prevState.basicInfo,
                        height: e.target.value
                      }
                    }))}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Dietary Preferences */}
      <Accordion className="w-1/2 m-auto" key="dietary-preferences" type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger>
            <div className="flex justify-between items-center p-2">
              <p className="text-lg font-semibold opacity-80">Dietary Preferences</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-2 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Diet Type</Label>
                  <Select
                    value={formValues.dietaryPreferences.dietType} // Bind value to state
                    onValueChange={(value) => setFormValues(prevState => ({
                      ...prevState,
                      dietaryPreferences: {
                        ...prevState.dietaryPreferences,
                        dietType: value // Update dietType with the selected value
                      }
                    }))}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Diet Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Any", "Vegan", "Vegetarian", "Non-Vegetarian", "Keto", "Paleo"].map((option, optionIndex) => (
                        <SelectItem key={optionIndex} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Label className="text-base">Intolerances</Label>
                <div className="flex gap-8 flex-wrap">
                  {["Dairy", "Gluten", "Peanuts", "Eggs", "Fish", "Lactose"].map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <Input
                        className="w-4 h-4"
                        type="checkbox"
                        checked={formValues.dietaryPreferences.intolerances.includes(option)} // Bind checked state to state
                        onChange={() => setFormValues(prevState => ({
                          ...prevState,
                          dietaryPreferences: {
                            ...prevState.dietaryPreferences,
                            intolerances: prevState.dietaryPreferences.intolerances.includes(option) ?
                              prevState.dietaryPreferences.intolerances.filter(i => i !== option) :
                              [...prevState.dietaryPreferences.intolerances, option]
                          }
                        }))}
                      />
                      <Label>{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Health Goals */}
      <Accordion className="w-1/2 m-auto" key="health-goals" type="single" collapsible>
        <AccordionItem value="2">
          <AccordionTrigger>
            <div className="flex justify-between items-center p-2">
              <p className="text-lg font-semibold opacity-80">Health Goals</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-2 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Goal</Label>
                  <Select
                    value={formValues.healthGoals.goal} // Bind value to state
                    onValueChange={(value) => setFormValues(prevState => ({
                      ...prevState,
                      healthGoals: {
                        ...prevState.healthGoals,
                        goal: value // Update goal with the selected value
                      }
                    }))}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Lose Weight", "Gain Muscle", "Maintain Weight"].map((option, optionIndex) => (
                        <SelectItem key={optionIndex} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Activity Level</Label>
                  <Select
                    value={formValues.healthGoals.activityLevel} // Bind value to state
                    onValueChange={(value) => setFormValues(prevState => ({
                      ...prevState,
                      healthGoals: {
                        ...prevState.healthGoals,
                        activityLevel: value // Update activityLevel with the selected value
                      }
                    }))}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Activity Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Sedentary", "Lightly Active", "Moderately Active", "Very Active"].map((option, optionIndex) => (
                        <SelectItem key={optionIndex} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Lifestyle Details */}
      <Accordion className="w-1/2 m-auto" key="lifestyle-details" type="single" collapsible>
        <AccordionItem value="3">
          <AccordionTrigger>
            <div className="flex justify-between items-center p-2">
              <p className="text-lg font-semibold opacity-80">Lifestyle Details</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-2 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Work Environment</Label>
                  <Select
                    value={formValues.lifeStyleDetails.workEnvironment} // Bind value to state
                    onValueChange={(value) => setFormValues(prevState => ({
                      ...prevState,
                      lifeStyleDetails: {
                        ...prevState.lifeStyleDetails,
                        workEnvironment: value // Update workEnvironment with the selected value
                      }
                    }))}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Work Environment" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Desk Job", "Field Job", "Active Job"].map((option, optionIndex) => (
                        <SelectItem key={optionIndex} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Sleep Schedule</Label>
                  <Select
                    value={formValues.lifeStyleDetails.sleepSchedule} // Bind value to state
                    onValueChange={(value) => setFormValues(prevState => ({
                      ...prevState,
                      lifeStyleDetails: {
                        ...prevState.lifeStyleDetails,
                        sleepSchedule: value // Update sleepSchedule with the selected value
                      }
                    }))}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Sleep Schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Very Good",
                        "Normal",
                        "Sightly Disturbed",
                        "Highly Disturbed"
                      ].map((option, optionIndex) => (
                        <SelectItem key={optionIndex} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={generatePlan} className="my-5">
        {
          generating ? (
            <>
              Generating
              <div className="border-b-2 ml-2 border-white animate-spin h-4 w-4 rounded-full"></div>
            </>
          ) : "Generate Plan"
        }
      </Button>

      {isGenerated && Response && (
        <div className='w-full' ref={dietPlanRef}>
          <DietPlan mealPlan={Response?.meal_plan} dailyTotals={Response?.daily_totals} />
        </div>
      )}

    </div>
  );
}
