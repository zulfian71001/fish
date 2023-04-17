<div class="navbar bg-slate-200 bg-opacity-60 fixed top-0 z-20 shadow-best4">
  <div class="container">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">SiDBANMU</a>
    </div>

    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a>Dashboard</a></li>
        <li><a>Lebam</a></li>
        <li><a>Pemdik</a></li>
        <li><a>About</a></li>
      </ul>
    </div>


    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="badge badge-sm indicator-item">8</span>
          </div>
        </label>
        <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div class="card-body">
            <span class="font-bold text-lg">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="{{ asset('img/pp.jpg') }}" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
            </a>
          </li>
          @if (Auth()->user())

          @if (Auth()->user()->level === 'penjual')
          <li><a>Kelola Penjualan</a></li>
          @endif

          @if (Auth()->user()->level === 'admin')
          <li><a>Admin</a></li>
          @endif

          @endif


          @if (Auth()->user())
          <li><a>Logout</a></li>
          @endif

        </ul>
      </div>
    </div>
  </div>
</div>