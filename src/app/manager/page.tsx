"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { Categories } from "./Categories"

export default function ManagerPage() {

  return (
    <div className="flex flex-col">
      <Categories />
    </div>
  )
}