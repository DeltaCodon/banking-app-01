"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId } from "@/lib/utils";

import { BankDropdown } from "./BankDropdown";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { ptFormSchema } from "@/lib/utils";
import { PTFormField } from "./PTFormField";

const formSchema = ptFormSchema;

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      shareableId: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const receiverAccountId = decryptId(data.shareableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };
      // create transfer
      const transfer = await createTransfer(transferParams);

      // create transfer transaction
      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId.$id,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId.$id,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };

        const newTransaction = await createTransaction(transaction);

        if (newTransaction) {
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
        <PTFormField
          control={form.control}
          name="senderBank"
          classname1="payment-transfer_form-item pb-6 pt-5"
          classname2="payment-transfer_form-content"
          label="Select Source Bank"
          description="Select the bank account you want to transfer funds from"
          compo={
            <BankDropdown
              accounts={accounts}
              setValue={form.setValue}
              otherStyles="!w-full"
            />
          }
        />

        <PTFormField
          control={form.control}
          name="name"
          classname1="payment-transfer_form-item pb-6 pt-5"
          classname2="payment-transfer_form-content"
          label="Transfer Note (Optional)"
          description="Please provide any additional information or instructions
                    related to the transfer"
          compo="textarea"
          placeholder="Write a short note here"
        />

        <div className="payment-transfer_form-details">
          <h2 className="text-18 font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-16 font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>

        <PTFormField
          control={form.control}
          name="email"
          classname1="payment-transfer_form-item py-5"
          label="Recipient's Email Address"
          compo="input"
          placeholder="ex: johndoe@gmail.com"
        />

        <PTFormField
          control={form.control}
          name="shareableId"
          classname1="payment-transfer_form-item pb-5 pt-6"
          label="Receiver's Plaid Sharable Id"
          placeholder="Enter the public account number"
          compo="input"
        />

        <PTFormField
          control={form.control}
          name="amount"
          classname1="payment-transfer_form-item py-5"
          label="Amount"
          placeholder="ex: 5.00"
          compo="input"
        />

        <div className="payment-transfer_btn-box">
          <Button type="submit" className="payment-transfer_btn">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;
