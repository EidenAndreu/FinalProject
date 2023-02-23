<template>
   <footer>
    <div class="footer">
    <p>Made by Eiden Andreu </p>
    <p>2023</p>
    </div>
   </footer>
  </template>
  
  <script setup>
  
  </script>
  
  
  <style>

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color5);
  padding: 10px;
  font-size: 1.2rem;
}

.footer p {
  margin: 0;
}

@media (max-width: 600px) {
  .footer {
    flex-direction: column;
    justify-content: center;
  }
}

  </style>
  