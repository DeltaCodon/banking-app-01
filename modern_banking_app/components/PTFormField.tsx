import { ptFormSchema } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

const formSchema = ptFormSchema;

interface PTFormFields {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  description?: string;
  placeholder?: string;
  classname1: string;
  classname2?: string;
  compo: any;
}

export const PTFormField = ({
  control,
  name,
  label,
  description,
  placeholder,
  classname1,
  classname2,
  compo,
}: PTFormFields) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="border-t border-gray-200">
          <div className={classname1}>
            {classname2 ? (
              <div className={classname2}>
                <FormLabel className="text-14 font-medium text-gray-700">
                  {label}
                </FormLabel>
                {description ? (
                  <FormDescription className="text-12 font-normal text-gray-600">
                    {description}
                  </FormDescription>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <FormLabel className="text-14 font-medium text-gray-700">
                {label}
              </FormLabel>
            )}
            <div className="flex w-full flex-col">
              <FormControl>
                {compo === "input" ? (
                  <Input
                    placeholder={placeholder}
                    className="input-class"
                    {...field}
                  />
                ) : compo === "textarea" ? (
                  <Textarea placeholder={placeholder} className="input-class" />
                ) : (
                  compo
                )}
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
