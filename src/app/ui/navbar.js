'use client';

import { Dropdown, Navbar } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

export function NavbarForAnon() {
    return (
      <Navbar
        fluid
        rounded
      >
        <Navbar.Brand href="/">
          <Image alt="Jref.io Log"
            className="mr-3 h-6 sm:h-9"
            width={40}
            height={40}
            src="/favicon.ico" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            jref.io
          </span>
        </Navbar.Brand>
        
        <Navbar.Collapse>
          <Navbar.Link
            active
            href="/"
          >
            <p>
              Home
            </p>
          </Navbar.Link>
          <Navbar.Link href="/links">
            Links
          </Navbar.Link>
          <Navbar.Link href="/register">
            Sign up
          </Navbar.Link>
          <Navbar.Link href="/login">
            Login
          </Navbar.Link>
          
        </Navbar.Collapse>
      </Navbar>
    )
  }
  

export default function NavbarForUser() {
  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="/">
        <Image alt="jref.io Logo"
          className="mr-3 h-6 sm:h-9"
          width={40}
          height={40}
          src="/favicon.ico" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          jref.io
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={<Image alt="jref.io Logo"
          className="mr-3 w-3 h-3 sm:w-4 sm:h-4 rounded"
          width={40}
          height={40}
          src="/favicon.ico" />}
        >
          <Dropdown.Item>
            <Link href='/'>Dashboard</Link> 
          </Dropdown.Item>
          <Dropdown.Item>
          <Link href='/links'>Links</Link> 
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link href='/logout'>Logout</Link> 
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="/"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="/links">
          Links
        </Navbar.Link>
        
      </Navbar.Collapse>
    </Navbar>
  )
}


