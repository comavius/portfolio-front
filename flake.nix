{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        build-with-content = {
          content-src,
          content-name ? null,
          ...
        }: let
          src-with-content =
            if content-name == null
            then self
            else
              pkgs.symlinkJoin {
                name = "content";
                paths = [
                  self
                  pkgs.mkDerivation
                  {
                    name = "wrapped-content";
                    src = content-src;
                    phases = "installPhase";
                    installPhase = ''
                      mkdir -p $out
                      cp -r $src/* $out/content
                    '';
                  }
                ];
              };
        in
          pkgs.buildNpmPackage {
            name = "comavius-portfolio-with-${content-name}";
            src = src-with-content;
            npmDeps = pkgs.importNpmDeps {
              npmRoot = self;
            };
          };
        formatter = pkgs.alejandra;
      }
    );
}
