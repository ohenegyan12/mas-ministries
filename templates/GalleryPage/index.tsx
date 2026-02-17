
"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import { useGalleries } from "@/hooks/useGalleries";
import { galleriesApi } from "@/lib/api";

const GalleryPage = () => {
    const [page, setPage] = useState(1);
    const { data: result, isLoading, error, refresh } = useGalleries(page);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [deletingId, setDeletingId] = useState<number | string | null>(null);

    const items = result?.data || [];
    const lastPage = result?.last_page || 1;

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            await galleriesApi.deleteGallery(deletingId);
            refresh();
            setDeletingId(null);
        } catch (err) {
            console.error("Failed to delete gallery item", err);
        }
    };

    return (
        <Layout title="Gallery">
            <Breadcrumbs items={["Home", "Gallery"]}>
                <Button
                    className="max-md:w-full"
                    icon="plus"
                    isPrimary
                    isMedium
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Image
                </Button>
            </Breadcrumbs>

            <div className="mb-2 text-h4">🖼️ Gallery Management</div>
            <div className="mb-8 text-gray-500 font-medium">
                Manage the photo gallery for the ministry website.
            </div>

            {isLoading ? (
                <div className="flex justify-center py-40">
                    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <div className="py-20 text-center text-error-100 font-medium bg-error-0 rounded-2xl border border-error-100/20">
                    <Icon className="fill-error-100 size-12 mx-auto mb-4" name="info" />
                    {error}
                </div>
            ) : items.length > 0 ? (
                <>
                    <div className="grid grid-cols-4 gap-6 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
                        {items.map((item: any) => (
                            <div key={item.id} className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                                    {item.image_path ? (
                                        <img
                                            src={item.image_path}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <Icon className="!size-12 fill-current" name="image" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                                        <div className={`shrink-0 status ${item.is_featured ? "status-green" : "status-gray"}`}>
                                            {item.is_featured ? "Featured" : "Standard"}
                                        </div>
                                    </div>
                                    <p className="text-body-sm text-gray-500 line-clamp-2 mb-4 font-medium">
                                        {item.description || "No description provided."}
                                    </p>
                                    <div className="mt-auto flex gap-2">
                                        <button
                                            onClick={() => setSelectedItem(item)}
                                            className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-body-xs font-bold text-gray-600 transition-colors flex items-center justify-center gap-1.5"
                                        >
                                            <Icon className="!size-4 fill-current" name="edit" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setDeletingId(item.id)}
                                            className="py-2 px-3 bg-gray-50 hover:bg-error-0 hover:text-error-100 rounded-lg text-gray-400 transition-colors"
                                        >
                                            <Icon className="!size-4 fill-current" name="trash" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {lastPage > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-12">
                            <button
                                className="px-4 py-2 border border-gray-100 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>
                            <div className="text-body-sm font-medium">
                                Page <span className="text-primary-600 font-bold">{page}</span> of {lastPage}
                            </div>
                            <button
                                className="px-4 py-2 border border-gray-100 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                disabled={page === lastPage}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="py-40 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                    <div className="size-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="!size-10 fill-gray-200" name="image" />
                    </div>
                    <h3 className="text-h4 mb-2">No Images Found</h3>
                    <p className="text-gray-400 font-medium mb-8">Start by uploading your first photo to the gallery.</p>
                    <Button icon="plus" isPrimary isMedium onClick={() => setIsAddModalOpen(true)}>Add Image</Button>
                </div>
            )}

            {/* Add Gallery Modal */}
            <Modal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                classWrapper="!max-w-160"
            >
                <GalleryForm
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={() => {
                        refresh();
                        setIsAddModalOpen(false);
                    }}
                />
            </Modal>

            {/* Edit Gallery Modal */}
            <Modal
                open={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                classWrapper="!max-w-160"
            >
                {selectedItem && (
                    <GalleryForm
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                        onSuccess={() => {
                            refresh();
                            setSelectedItem(null);
                        }}
                    />
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                open={!!deletingId}
                onClose={() => setDeletingId(null)}
                classWrapper="!max-w-120"
            >
                <div className="p-8 text-center">
                    <div className="size-16 bg-error-0 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="!size-8 fill-error-100" name="trash" />
                    </div>
                    <h3 className="text-h4 mb-2">Remove Image?</h3>
                    <p className="text-gray-500 font-medium mb-10">
                        Are you sure you want to delete this image from the gallery?
                    </p>
                    <div className="flex gap-3">
                        <Button className="flex-1" isMedium onClick={() => setDeletingId(null)}>Cancel</Button>
                        <Button className="flex-1" isPrimary isMedium onClick={handleDelete}>Delete</Button>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};

const GalleryForm = ({ item, onClose, onSuccess }: { item?: any; onClose: () => void; onSuccess: () => void }) => {
    const [title, setTitle] = useState(item?.title || "");
    const [imagePath, setImagePath] = useState(item?.image_path || "");
    const [description, setDescription] = useState(item?.description || "");
    const [category, setCategory] = useState(item?.category || "events");
    const [isFeatured, setIsFeatured] = useState(item ? item.is_featured : false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = {
                title,
                description,
                image_path: imagePath,
                category,
                is_featured: isFeatured
            };
            if (item) {
                await galleriesApi.updateGallery(item.id, data);
            } else {
                await galleriesApi.createGallery(data);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.message || "Failed to save gallery item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="p-8" onSubmit={handleSubmit}>
            <div className="mb-8">
                <h3 className="text-h4 mb-1">{item ? "Edit Image" : "Add Image"}</h3>
                <p className="text-gray-500 font-medium font-body-sm">
                    {item ? "Update the details for this gallery item." : "Upload a new photo to the ministry gallery."}
                </p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                    <Field
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Outreach Mission 2024"
                        required
                    />
                    <Field
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Events, Missions, Youth"
                    />
                </div>

                <Field
                    label="Image Path (URL)"
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    required
                />

                <Field
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief details about this photo..."
                    textarea
                />

                <Checkbox
                    label="Feature this item"
                    checked={isFeatured}
                    onChange={() => setIsFeatured(!isFeatured)}
                />

                {imagePath && (
                    <div className="p-2 border border-gray-100 rounded-xl bg-gray-50">
                        <div className="text-body-xs font-bold text-gray-400 uppercase mb-2 ml-1">Preview</div>
                        <img
                            src={imagePath}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-lg"
                            onError={(e: any) => e.target.src = 'https://placehold.co/600x400?text=Invalid+Image+URL'}
                        />
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-error-0 border border-error-100 rounded-xl text-error-100 text-body-sm font-medium flex items-center gap-2">
                        <Icon className="fill-error-100 !size-4" name="info" />
                        {error}
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
                <Button type="button" isMedium onClick={onClose}>Cancel</Button>
                <Button type="submit" isPrimary isMedium disabled={loading}>
                    {loading ? "Saving..." : "Save Item"}
                </Button>
            </div>
        </form>
    );
};

export default GalleryPage;
