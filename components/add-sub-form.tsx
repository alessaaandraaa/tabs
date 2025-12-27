"use client";

import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { formSchema } from "@/types/form.types";
import { useAddSubsQuery } from "@/queries/subscriptions.queries";
import { FormPayload } from "@/types/form.types";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const subTypes = [
  { label: "Streaming", value: "streaming" },
  { label: "Gaming", value: "gaming" },
  { label: "Educational", value: "edu" },
  { label: "Utility", value: "util" },
  { label: "Other", value: "other" },
];

const subFrequency = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Annual", value: "annual" },
  { label: "Seasonal", value: "seasonal" },
];

export default function AddSubForm() {
  const add = useAddSubsQuery();
  const form = useForm({
    defaultValues: {
      name: "",
      type: "",
      frequency: "",
      price: 0 | NaN,
      renewal_date: "",
      auto_renew: false,
      free_trial: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const data: FormPayload = {
        name: value.name,
        type: value.type,
        frequency: value.frequency,
        price: value.price,
        renewal_date: value.renewal_date,
        auto_renew: value.auto_renew,
        free_trial: value.free_trial,
      };

      console.log("DATA: ", data);

      add.mutate(data, {
        onSuccess: () => {
          toast.success("Added subscription.");
        },
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>ADD A SUBSCRIPTION</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="add-sub-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-1">
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div className="flex items-start">
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center gap-2">
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Name"
                          autoComplete="off"
                        />
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  </div>
                );
              }}
            />
            <form.Field
              name="type"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field orientation="responsive" data-invalid={isInvalid}>
                    <div className="flex items-center">
                      <FieldContent>
                        <FieldLabel htmlFor="form-tanstack-select-language">
                          Type
                        </FieldLabel>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </FieldContent>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger
                          id="form-tanstack-select-language"
                          aria-invalid={isInvalid}
                          className="min-w-40"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          {subTypes.map((types) => (
                            <SelectItem key={types.value} value={types.value}>
                              {types.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </Field>
                );
              }}
            />
            <form.Field
              name="frequency"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field orientation="responsive" data-invalid={isInvalid}>
                    <div className="flex items-center">
                      <FieldContent>
                        <FieldLabel htmlFor="form-tanstack-select-language">
                          Frequency
                        </FieldLabel>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </FieldContent>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger
                          id="form-tanstack-select-language"
                          aria-invalid={isInvalid}
                          className="min-w-40"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          {subFrequency.map((freq) => (
                            <SelectItem key={freq.value} value={freq.value}>
                              {freq.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </Field>
                );
              }}
            />
            <form.Field
              name="price"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div className="flex items-start">
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center gap-2">
                        <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          type="number"
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.valueAsNumber)
                          }
                          aria-invalid={isInvalid}
                          placeholder="Price"
                          autoComplete="off"
                        />
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  </div>
                );
              }}
            />
            <form.Field
              name="renewal_date"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div className="flex items-start">
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center gap-2">
                        <FieldLabel htmlFor={field.name}>
                          Renewal Date
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          type="date"
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          autoComplete="off"
                        />
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  </div>
                );
              }}
            />
            <form.Field
              name="auto_renew"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div className="mt-3">
                    <Field orientation="horizontal" data-invalid={isInvalid}>
                      <Checkbox
                        id="form-tanstack-checkbox-responses"
                        name={field.name}
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(checked === true)
                        }
                      />
                      <FieldLabel
                        htmlFor="form-tanstack-checkbox-responses"
                        className="font-normal"
                      >
                        Auto-Renew
                      </FieldLabel>
                    </Field>
                  </div>
                );
              }}
            />
            <form.Field
              name="free_trial"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <div className="mt-3">
                    <Field orientation="horizontal" data-invalid={isInvalid}>
                      <Checkbox
                        id="form-tanstack-checkbox-responses"
                        name={field.name}
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(checked === true)
                        }
                      />
                      <FieldLabel
                        htmlFor="form-tanstack-checkbox-responses"
                        className="font-normal"
                      >
                        Free Trial?
                      </FieldLabel>
                    </Field>
                  </div>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="add-sub-form">
            Add Subscription
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
