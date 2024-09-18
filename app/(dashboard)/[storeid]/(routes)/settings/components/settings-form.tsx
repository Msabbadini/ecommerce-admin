"use client"

import * as z from "zod"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useOrigin } from "@/hooks/use-origin"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const [open, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true)
            console.log("params", params);

            await axios.patch(`/api/stores/${params.storeid}`, data);
            router.refresh();
            toast.success("Store updated")
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeid}`);
            router.refresh()
            // router.replace('/')
            window.location.href = '/';
            toast.success("Store deleted")
        } catch (error) {
            toast.error("Make sure you are removed all products and categories first")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={isLoading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Update your store settings"
                />
                <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => {
                        setOpen(true)

                    }}
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </div >
            <Separator />
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} {...field} placeholder="Store Name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={isLoading} className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form >
            <Separator />
            <ApiAlert
                title="test"
                description={`${origin}/api/${params.storeid}`}
                variant="public"
            />
        </>
    )
}