

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
      <p className="text-xs text-muted-foreground">© 2024 Brainly Inc. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <div className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-primary" >
          Terms of Service
        </div>
        <div className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-primary">
          Privacy
        </div>
      </nav>
    </footer>
  )
}

export default Footer

