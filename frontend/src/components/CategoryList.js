import React, { useState, useEffect } from "react";
import { getCategories, createCategory} from "../services";
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
      await createCategory(formData.name);
      const response = await getCategories();
      setCategories(response.data);
      setValue("name", "");
    } catch (error) {
      setError("name", {
        type: "custom",
        message: "name is required",
      });
    }
  };

  return (
    <>
      {categories.length > 0 && (
        <ul className="category-list">
          {categories.map((category) => {
            const isSelected = category.id === selectedCategory;
            return (
              <li
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                <p className={isSelected && "selected"}>{category.name}</p>
              </li>
            );
          })}
        </ul>
      )}

      <form
        className="login-form"
        onSubmit={handleSubmit(handleCreateCategory)}
      >
        <fieldset>
          <input
            placeholder="Add category"
            type="text"
            name="name"
            id="name"
            {...register("name", {
              required: "Required field",
            })}
          />
          <span>{errors?.name && errors.name.message}</span>
        </fieldset>
        <button className="Add-category">Add category</button>
      </form>
    </>
  );
};
