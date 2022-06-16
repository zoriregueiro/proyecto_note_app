import "./css/categoryList.css";
import React, { useState, useEffect } from "react";
import { getCategories, createCategory } from "../services";
import { useForm } from "react-hook-form";

export const CategoryList = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();

        setCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].id);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    loadCategories();
  }, []);

  const handleCreateCategory = async (formData) => {
    try {
      await createCategory(formData.categoryName);
      const response = await getCategories();
      setCategories(response.data);
      setValue("categoryName", "");
    } catch (error) {
      setError("categoryName", {
        type: "custom",
        message: "Category is required",
      });
    }
  };

  return (
    <div className="category-column">
      <form
        className="category-form"
        onSubmit={handleSubmit(handleCreateCategory)}
      >
        <fieldset>
          <input
            placeholder="Write a category"
            type="text"
            name="categoryName"
            id="categoryName"
            {...register("categoryName", {
              required: "Required field",
            })}
          />
          <span>{errors?.categoryName && errors.categoryName.message}</span>
        </fieldset>
        <button className="add-category-button">Add category</button>
      </form>

      {categories.length > 0 && (
        <ul className="category-list">
          {categories.map((category) => {
            const isSelected = category.id === selectedCategory;
            return (
              <li
                className="category-tag"
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                <p className={isSelected && "selected"}>{category.name}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
