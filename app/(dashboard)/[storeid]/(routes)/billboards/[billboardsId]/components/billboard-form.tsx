"use client"

import * as z from "zod"
import { Billboard } from "@prisma/client"
import { ImageUp, Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertModal } from "@/components/modals/alert-modal"
import ImageUpload from "@/components/ui/image-upload"

interface BillboardFormProps {
    initialData: Billboard | null
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>

export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {

    const params = useParams()
    const router = useRouter()


    const [open, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const title = initialData ? "Edit Billboard" : "New Billboard"
    const description = initialData ? "Edit a Billboard" : "New a Billboard"
    const toastMessage = initialData ? "Billboard updated" : "Billboard created"
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: "",
        }
    })

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true)
            console.log("params", params);
            if (initialData) {
                await axios.patch(`/api/${params.storeid}/billboards/${params.billboardsId}`, data);

            } else {

                await axios.post(`/api/${params.storeid}/billboards`, data);
            }
            router.refresh();
            router.push(`/${params.storeid}/billboards`);
            toast.success(toastMessage)
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeid}/billboards/${params.billboardsId}`);
            router.refresh()
            // router.replace('/')
            // window.location.href = '/';
            router.push(`/${params.storeid}/billboards`);
            toast.success("Billboard deleted")
        } catch (error) {
            toast.error("Make sure you are removed all categories using this billboard first")
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
                    title={title}
                    description={description}
                />
                {initialData && (<Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => {
                        setOpen(true)

                    }}
                >
                    <Trash className="w-4 h-4" />
                </Button>)}
            </div >
            <Separator />
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={isLoading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} {...field} placeholder="Billboard label" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={isLoading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form >
            <Separator />
        </>
    )
}